import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
const SignUp = () => {
  const [verificationStage, setVerificationStage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const { register, getValues, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });
  const email = watch().username;
  const signUpAuth = () => {
    const { username, password, name } = getValues();
    setDisableButton(true);
    Auth.signUp({
      username,
      password,
      attributes: {
        name,
        profile: "user",
      },
    })
      .then(() => {
        setVerificationStage(true);
      })
      .catch(() => {
        alert("Hubo un errror");
      })
      .finally(() => {
        setDisableButton(false);
      });
  };
  if (verificationStage) return <VerificationStage email={email} />;
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex flex-col gap-10 w-80">
        <label htmlFor="" className="flex flex-col">
          Nombre
          <input
            type="text"
            {...register("name", {
              required: true,
            })}
            className="border border-gray-500"
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          Correo
          <input
            type="text"
            {...register("username", {
              required: true,
            })}
            className="border border-gray-500"
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          Contraseña
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
            className="border border-gray-500"
          />
        </label>
        <button type="button" onClick={signUpAuth} disabled={disableButton}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default SignUp;

const VerificationStage = ({ email = "" }) => {
  const router = useRouter();
  const { register, getValues } = useForm({
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = () => {
    const { code } = getValues();
    Auth.confirmSignUp(email, code)
      .then(() => {
        router.push("/signin");
      })
      .catch(() => {
        alert("Error al confirmar el registro");
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex flex-col  gap-4">
        Ingresa codigo de verificacion que te enviamos al correo
        <div className=" flex flex-col  gap-4">
          <input
            type="text"
            {...register("code", {
              required: true,
            })}
            className="border border-gray-500"
          />
          <button type="button" onClick={onSubmit}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
