import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import TeamList from '../../components/TeamList'
import { useUserTeams } from '../../hooks/teams'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'

const Teams = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const userTeams = useUserTeams(props.uid!)

  return userTeams && <TeamList teams={userTeams} />
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
