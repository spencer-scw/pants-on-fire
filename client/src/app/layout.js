import '../index.css'
import PlayerList from './components/PlayerList'
import TitleBar from './components/TitleBar'

export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TitleBar />
        <PlayerList />
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
