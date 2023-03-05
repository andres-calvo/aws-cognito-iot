import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const Signin = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, getValues } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSignIn = async () => {
    const { username, password } = getValues();
    setIsDisabled(true);
    await Auth.signIn({
      username,
      password,
    })
      .catch(() => {
        alert("Error al signin");
      })
      .finally(() => setIsDisabled(false));
    const credentials = await Auth.currentUserCredentials();
    const identityId = credentials.identityId;
    await axios.post("/api/attachIot", {
      identityId,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="  flex flex-col gap-10">
          <label htmlFor="" className="flex flex-col">
            Correo
            <input
              type="text"
              {...register("username", {
                required: true,
              })}
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Contraseña
            <input
              type="text"
              {...register("password", {
                required: true,
              })}
            />
          </label>
          <button onClick={onSignIn} disabled={isDisabled}>
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
