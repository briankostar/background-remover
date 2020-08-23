import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const uploadedImage = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log("reader", reader);
      console.log("file", file);

      axios.post("https://some-lambdaapi.com/remove-bg", file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Background Remover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Easily remove backgrounds using AI</h1>

        <div>
          {/* <form action="https://some-lambdaapi.com/remove-bg" method="post"> */}
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div>
            <img ref={uploadedImage} />
          </div>
          {/* <input type="submit" />
          </form> */}
        </div>
      </main>
    </div>
  );
}
