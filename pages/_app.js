import Layout from "@/components/Layout"
import Head from 'next/head'
import '@/styles/globals.css'
import { PokeballProvider } from "@/contexts/pokeballcontext"

export default function App({ Component, pageProps }) {
  return (
    <PokeballProvider>
      <Layout>
        <Head>
          <title>Pokedex_Web</title>
          <meta name="description" content="This Web for pokemon show" />
          <meta name="keywords" content="pokedex, pokemon" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </PokeballProvider>
  )
}
