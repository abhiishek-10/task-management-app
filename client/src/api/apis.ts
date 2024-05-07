type IFormInput = {
  email: string;
  password: string;
};

export const signUpUser = async (data: IFormInput) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Signup failed");
    }
    const userToken = await response.json();

    return userToken.token;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const logInUser = async (data: IFormInput) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const userToken = await response.json();

    return userToken.token;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const logOutUser = async (token: string | null) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    const logoutSuccess = await response.json();

    return logoutSuccess;
  } catch (error) {
    console.error("Error:", error);
  }
};
