import { useRouter } from 'next/router'
import TaskList from '../../components/TaskList'
import { useTeamTasks } from '../../hooks/tasks'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'
import Head from 'next/head'
import { useTeam } from '../../hooks/teams'

const TeamId = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter()
  const teamId = router.query.teamId as string | undefined
  const teamData = useTeam(teamId)
  const tasksfromTeam = useTeamTasks(teamId)

  return (
    <>
      <Head>
        <title>Team - {teamData.name}</title>
        <meta
          name='Teamwork Manager App'
          content='Teamwork and task management app - Team page'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {tasksfromTeam && <TaskList tasks={tasksfromTeam} />}
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

export default TeamId
