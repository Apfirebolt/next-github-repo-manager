import { Fragment } from "react";
import Footer from "../../components/Footer";
export default function About() {

  const func = () => {
    console.log('This is a test function', process.env.DB_HOST);
  }
  
  func();

  return (
    <Fragment>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center text-red-700">
            A test page rendered on server
          </h1>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
