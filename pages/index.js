import Head from "next/head";
import styles from "../styles/Home.module.css";

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
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Background Remover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Easily remove backgrounds using AI</h2>

        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div>
          <img ref={uploadedImage} />
        </div>
      </main>
    </div>
  );
}
