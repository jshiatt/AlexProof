const config = {
  basePath: "https://localhost:44376",
  apiKey: () => `${window.localStorage.getItem("token")}`
}

export default config;