import app from "./app";
const port = 5000;

async function main() {
  try {
    app.listen(port, () => {
      console.log(`server is online on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main()
