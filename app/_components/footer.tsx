export default function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/hugolomba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hugo Lomba
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
