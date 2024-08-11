import "./page.css";
import Link from "next/link";


export default function Home() {
  return (
    <main>

      <div className="title">
       <h2 className="heading">CODE EDITOR</h2> 
        </div> 

      <div className="options">
      <Link href="/playground">
        <div
          className="playground"
        >
          <h2>
            PLAYGROUND{" "}
            <span>
            </span>
          </h2>
          <p >
            
          </p>
        </div>
      </Link>

      <Link href="./practice" className="practice">
      <h2>
            PRACTICE
          </h2>
          
          <p >
            
          </p>
      </Link>
        
          

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="compete"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 >
            COMPETE{" "}
            <span >
              
            </span>
          </h2>
          <p >
            
          </p>
        </a>
      </div>
    </main>
  );
}
