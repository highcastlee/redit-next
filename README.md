# redit-next

## nextjs

nextjs는 SSR을 쉽게 구현할 수 있게 도와주는 프레임워크

pre-rendering을 통해 페이지를 미리 렌더링하며 완성된 HTML을 가져오기 때문에 사용자와 검색 엔진 ㅋ롤러에게 바로 렌더링된 페이지를 전달할 수 있게 된다.

### 파일 기반 라우팅

- nextjs에서 제공하는 Link 태그를 import하여 사용

```javascript
 <Link href=`/posts/${id}` >
 </Link>
```

위 코드처럼 Link로 pages/posts 디렉토리에 [id].tsx를 찾아서 동적으로 라우팅 처리함

- 파일 위치 : pages/posts/[id].tsx

- `<Link prefetch href=".." >` 처럼 prefetch 속성을 사용하면, production 레벨에 한해 데이터를 먼저 불러온 다음 라우팅을 시작한다.

### 주요 메서드

#### getStaticProps()

- 빌드 시, 고정되는 값.
- 빌드 이후 값 변경 불가
- 페이지에 필요한 데이터가 빌드 시에 사용 가능할 때
- 모든 사용자에게 같은 데이터를 보여줄 때
- 변경 가능성이 없는 데이터 출력 시 사용

```javascript
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
```

#### getStaticPaths()

- 빌드 타임 때, 정적으로 렌더링할 경로 설정
- 동적 라우팅을 사용할 때, 어떤 페이지를 미리 static으로 빌드

```javascript
 export async function getStaticPaths(){
   return {
     // 빌드 타임 때 아래의 경로만 pre-rendering
     paths:[
       {params: {dynamic: 1}},
       {params: {dynamic: 2}},
       ...
     ],
     // 추후 요청에 만들어줄 지 여부
     fallback: true
   }
 }
```

#### getServerSideProps()

- 요청에 따라 서버로부터 데이터를 가져옴
- 페이지에 자주 업데이트 되는 데이터가 포함되어 있고, 데이터를 미리 렌더링할 필요가 없는 경우에는 클라이언트 측에서 데이터를 가져올 수 있다.
- 매 request마다 실행된다.
  - 요청 시, 쿠키 인증/인가 확인 등으로 활용 가능

```javascript
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
      headers: { cookie },
    });

    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
```
