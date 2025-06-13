import Hero from "@/components/layout/hero";
import HomeMenu from "@/components/layout/home-menu";
import SectionHeaders from "@/components/layout/section-headers";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Non excepteur sint aute minim sint. In nulla ullamco voluptate
            reprehenderit qui. Duis consectetur aliqua amet ut labore pariatur
            laboris occaecat voluptate. Aute nisi veniam culpa nulla aliquip in
            magna non deserunt consequat anim. Velit reprehenderit aliqua id
            commodo incididunt veniam commodo mollit est. Dolore sit aute et
            eiusmod irure ea excepteur ut eu magna velit nostrud nisi. Fugiat
            occaecat in tempor ex.
          </p>
          <p>
            Non excepteur sint aute minim sint. In nulla ullamco voluptate
            reprehenderit qui. Duis consectetur aliqua amet ut labore pariatur
            laboris occaecat voluptate. Aute nisi veniam culpa nulla aliquip in
            magna non deserunt consequat anim.
          </p>
          <p>
            Non excepteur sint aute minim sint. In nulla ullamco voluptate
            reprehenderit qui. Duis consectetur aliqua amet ut labore pariatur
            laboris occaecat voluptate.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact" >
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500 "
            href="tel:+46738123123"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
      
    </>
  );
}
