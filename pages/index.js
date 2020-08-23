import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  console.log(
    "process.env.NEXT_PUBLIC_API_URL,",
    process.env.NEXT_PUBLIC_API_URL
  );
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

      const formData = new FormData();
      formData.append("file", file);
      axios.post(apiUrl, formData, {
        headers: {
          // "Content-Type": file.type,
          "content-type": "multipart/form-data",
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
          {/* <form action={apiUrl} method="post"> */}
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
