import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import TeamList from '../../components/TeamList'
import { useUserTeams } from '../../hooks/teams'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'
import Head from 'next/head'

const Teams = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const userTeams = useUserTeams(props.uid)

  return (
    <>
      <Head>
        <title>Teamwork Manager - Teams</title>
        <meta
          name='Teamwork Manager App'
          content='Teamwork and task management app - Teams page'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {userTeams && <TeamList teams={userTeams} />}
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    const { uid, email } = token

    return {
      props: { uid, email },
    }
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()

    return { props: { message: 'NO PROPS PASSED' } }
  }
}

export default Teams
