import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Container, AppBar, Toolbar, Chip } from '@mui/material'
import { useSocket } from './presentation/hooks/useSocket'
import { ChatContainer } from './presentation/components/Chat/ChatContainer'

const DEFAULT_CONVERSATION_ID = 'main-support-chat'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6e8efb',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  shape: {
    borderRadius: 12,
  },
})

function App() {
  const { isConnected } = useSocket();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #6e8efb, #a777e3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI Real-Time Support
            </Typography>
            <Chip
              label={isConnected ? 'Soporte Online' : 'Desconectado'}
              color={isConnected ? 'success' : 'error'}
              variant="outlined"
              size="small"
            />
          </Toolbar>
        </AppBar>

        <Container component="main" sx={{ py: 4, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ChatContainer conversationId={DEFAULT_CONVERSATION_ID} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
