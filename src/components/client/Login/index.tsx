import {
  Alert,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  TextField,
} from "@suid/material";

import { Accessor, batch, Component, createSignal, Setter } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

import type { Client } from "revolt-toolset";

import type { user } from "../../../types/rechat-types";
import { LoginOutlined } from "@suid/icons-material";

interface Login {
  client: Client;
  userSetter: SetStoreFunction<user>;
  logSetter: Setter<boolean>;
  logged: Accessor<boolean>;
}

const [email, setEmail] = createSignal<string>("");
const [password, setPassword] = createSignal<string>("");

const [error, setError] = createSignal<string>();

const [loading, setLoading] = createSignal<boolean>(false);

const Login: Component<Login> = ({
  client,
  userSetter,
  logSetter,
  logged,
}) => {
  async function AuthWithEmail(email: string, password: string) {
    try {
      setLoading(true);
      await client.authenticate({
        email: email,
        password: password,
        friendly_name: "ReChat",
      }).catch((e) => {
        throw e;
      }).finally(() => {
        setLoading(false);
        batch(() => {
          logSetter(true);
          userSetter("session_type", "email");
        });
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <>
      {!logged() && (
        <Container fixed sx={{ marginTop: 2, justifyContent: "center" }}>
          <img
            style={{
              display: "block",
              "margin-left": "auto",
              "margin-right": "auto",
            }}
            src="/Logo.svg"
          >
          </img>
          <Alert severity="warning" sx={{ my: 1 }}>
            This client is currently in In-Dev. Some features may change overtime (or it will add new feature) until Version 1
          </Alert>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (email() && password()) {
                try {
                  await AuthWithEmail(email() ?? "", password() ?? "")
                    .catch(
                      (e) => {
                        throw e;
                      },
                    );
                } catch (e) {
                  console.error(e);
                }
              }
            }}
          >
            <FormControl fullWidth>
              <TextField
                sx={{ my: 1 }}
                label="Email"
                value={email() || ""}
                onChange={(e) =>
                  setEmail(e.currentTarget.value)}
              />
              <TextField
                sx={{ my: 1 }}
                label="Password"
                type="password"
                value={password() || ""}
                onChange={(e) =>
                  setPassword(e.currentTarget.value)}
              />
              <ButtonGroup fullWidth>
                <Button
                  startIcon={<LoginOutlined />}
                  variant="contained"
                  disabled={loading()}
                  type="submit"
                >
                  Login
                </Button>
                <Button variant="contained" disabled={true}>
                  Login with Token (Coming Soon)
                </Button>
              </ButtonGroup>
            </FormControl>
          </form>

          <Breadcrumbs sx={{ fontSize: 10, my: 2, textAlign: 'center' }}>
            <code>
              {window.navigator.userAgent}
            </code>
          </Breadcrumbs>
        </Container>
      )}
    </>
  );
};
export { Login };
