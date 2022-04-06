import TaskList from '../../components/TaskList'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useUserTasks } from '../../hooks/tasks'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebase/admin'
import Head from 'next/head'
import TaskFilter from '../../components/TaskFilter'

const Tasks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const tasks = useUserTasks(props.uid!)

  return (
    <>
      <Head>
        <title>Teamwork Manager - Tasks</title>
        <meta
          name='Teamwork Manager App'
          content='Teamwork and task management app - Tasks page'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {tasks && (
        <>
          <TaskFilter />
          <TaskList tasks={tasks} />
        </>
      )}
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

export default Tasks
