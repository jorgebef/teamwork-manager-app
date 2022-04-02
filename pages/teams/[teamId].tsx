import { useRouter } from 'next/router'
import TaskList from '../../components/TaskList'
import { useTeamTasks } from '../../hooks/tasks'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'

const TeamId = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter()
  const teamId = router.query.teamId as string | undefined
  const tasksfromTeam = useTeamTasks(teamId)

  return tasksfromTeam && <TaskList tasks={tasksfromTeam} />
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
