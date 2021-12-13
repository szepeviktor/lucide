import Layout from '../../components/Layout';
import Head from 'next/head';
import fetchAllDocuments from '../../lib/fetchAllDocuments'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from '../../lib/mdxComponents';
import HeadingNavigationProvider from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import DocsMenu from '../../components/DocsMenu';
import { Box } from '@chakra-ui/react';

const DocPage = ({ doc, data, content }) => {
  if (!data || !doc) return null

  return (
    <HeadingNavigationProvider>
      <Layout aside={ <DocsMenu display={{ base:'none', lg: 'block' }}/> }>
        { data?.title ? (
          <Head>
            <title>{ data.title }</title>
          </Head>
        ) : null}
        <Box maxWidth="lg" width='100%' marginX='auto'>
          <MDXRemote {...doc} data={data} components={mdxComponents} />
        </Box>
      </Layout>
    </HeadingNavigationProvider>
  )
}

export default DocPage

export async function getStaticProps({ params }) {
  const allDocs = await fetchAllDocuments();
  const doc = allDocs.find(({filename = ''}) => filename === 'index.md');

  return { props: doc }
}
