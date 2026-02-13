import Button from "./Button";
import Container from "./Container";

function Header() {
  return (
    <>
      <header className="bg-navBG text-white relative z-20">
        <Container className="flex items-center min-h-[--header-row-height]">
          <a
            href="/"
            className="h-[--header-row-height] flex items-center px-6 -ml-6"
          >
            🍎 <span className="sr-only">Back to home</span>
          </a>
        </Container>
      </header>
      <div className="sticky z-20 top-0 bg-navBG text-white ">
        <Container className="flex justify-between items-center min-h-[--header-row-height]">
          <span className="text-lg font-semibold">Apple TV+</span>{" "}
          <Button size="sm">Stream now</Button>
        </Container>
      </div>
    </>
  );
}

export default Header;
