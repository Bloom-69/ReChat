import {
  Alert,
  Breadcrumbs,
  FormControl,
} from "@suid/material";

import { Accessor, batch, Component, createSignal, Setter } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

import type { Client } from "revkit";

import type { user } from "../../../types/rechat-types";
import { styled } from "solid-styled-components";

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
        friendly_name: "Glow (Dev)",
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

  const Base = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 1rem;
  `

  const FormGroup = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  `

  const TextArea = styled("input")`
    background: #000;
    color: #fff;
    padding: 0.3em;
  `

  const ButtonGroup = styled("div")`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  `

  const Button = styled('button')`
    background: #0f0e10;
    color: #e1edf9;
    
    &:disabled {
      opacity: 20%;
    }
  `

  return (
    <>
      {!logged() && (
        <Base>
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
          <FormGroup
            name="Login"
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
            <TextArea 
              name="email"
              type="email"
              placeholder="Email"
              value={email() || ""}
              onChange={(e) =>
                setEmail(e.currentTarget.value)}
            />
            <TextArea
              name="password"
              placeholder="Password"
              type="password"
              value={password() || ""}
              onChange={(e) =>
                setPassword(e.currentTarget.value)}
            />
            <ButtonGroup>
              <Button
                disabled={loading()}
                type="submit"
              >
                Login
              </Button>
              <Button disabled={true}>
                Login with Token (Coming Soon)
              </Button>
            </ButtonGroup>
          </FormGroup>

          <Breadcrumbs sx={{ fontSize: 10, my: 2, textAlign: 'center' }}>
            <code>
              {window.navigator.userAgent}
            </code>
          </Breadcrumbs>
        </Base>
      )}
    </>
  );
};
export { Login };
