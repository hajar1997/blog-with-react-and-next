import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Kateqoriyalar</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
      {posts.map((post, index) => (
             <div className='lg:col-span-4  col-span-1'>
               <PostCard key={index} post={post.node} />
            </div>
          ))}
        <div className="col-span-1 hidden lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}