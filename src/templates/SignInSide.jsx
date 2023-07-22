import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

import { FirebaseAuth } from './../config/firebaseConfig';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide({
  //handleClose,
  //getGroupsAndData
}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      setErrorEmail(null);
      setErrorPass(null);
      const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      if (resp.user) {
        localStorage.setItem('user', JSON.stringify(resp.user));
        //handleClose()
        //getGroupsAndData()
      }
    } catch (e) {
      switch (e.code) {
        case 'auth/wrong-password':
          setErrorPass('La contraseña es incorrecta');
          break;
        case 'auth/user-not-found':
          setErrorEmail('Correo no registrado');
          break;
        case 'auth/invalid-email':
          setErrorEmail('Correo inválido');
          break;
        case 'auth/missing-password':
          setErrorPass('Contraseña requerida');
          break;
        case 'auth/too-many-requests':
          setErrorPass('El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión');
          break;
        case 'auth/email-already-in-use':
          setErrorPass('Este correo ya esta en uso');
        default:
          setErrorPass(e.message);
          break;
      }
    }
  };

  const createAccount = async () => {
    try {
      setErrorEmail(null);
      setErrorPass(null);
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      if (resp.user) {
        localStorage.setItem('user', JSON.stringify(resp.user));
      }
    } catch (e) {
      switch (e.code) {
        case 'auth/wrong-password':
          setErrorPass('La contraseña es incorrecta');
          break;
        case 'auth/user-not-found':
          setErrorEmail('Correo no registrado');
          break;
        case 'auth/invalid-email':
          setErrorEmail('Correo inválido');
          break;
        case 'auth/missing-password':
          setErrorPass('Contraseña requerida');
          break;
        case 'auth/too-many-requests':
          setErrorPass('El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión');
          break;
        case 'auth/email-already-in-use':
          setErrorPass('Este correo ya esta en uso');
        default:
          setErrorPass(e.message);
          break;
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {checked ? 'Ingresar a tu cuenta' : 'Registro de cuentas nuevas'}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errorEmail !== null}
                helperText={errorEmail || 'Campo requerido'}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errorPass !== null}
                helperText={errorPass || (checked ? 'Campo requerido' : 'Cree una contraseña de al menos 6 caracteres')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={checked ? 'secondary' : 'primary'}
                onClick={checked ? handleLogin : createAccount}
              >
                {checked ? 'Iniciar sesión' : 'Crear nueva cuenta'}
              </Button>

              <Grid container>
                <Grid item style={{ width: '100%' }} sx={{ mt: 2 }}>
                  <Link onClick={handleChange} variant="body2">
                    {checked ? '¿No tienes una cuenta? Inscribirse' : '¿Ya tienes una cuenta? Autenticarse'}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}