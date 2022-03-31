import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import { Typography } from '@mui/material'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useUserTasks } from '../../hooks/tasks'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'

const Tasks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { user } = useAuthCtx()
  const tasks = useUserTasks(props.uid!)

  return !tasks ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={tasks} />
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

export default Tasks
