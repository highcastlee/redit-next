import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../../lib/post';

import Head from 'next/head';
import React from 'react';
import homeStyles from '../../styles/Home.module.css';

function Post({
  postData,
}: {
  postData: {
    title: string;
    id: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headinhXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // [{params: {id: 'pre-rendering}}, {params: {id: 'pre-rendering}}]
  return {
    paths,
    // fallback이 false라면, getStaticPaths로 리턴되지 않는 것은 모두 404로 처리
    // fallback이 true라면, getStaticPaths로 리턴되지 않는 것은 fallback 페이지로 처리
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
