export default function RedirectToPayFast({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) {
  const fields = JSON.parse(decodeURIComponent(searchParams.fields));

  return (
    <html>
      <body>
        <form
          id="payfastForm"
          action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
          method="POST"
        >
          {Object.entries(fields).map(([key, val]) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={val as string}
              readOnly
            />
          ))}
        </form>

        <script
          dangerouslySetInnerHTML={{
            __html: `document.getElementById("payfastForm").submit();`,
          }}
        />
      </body>
    </html>
  );
}
