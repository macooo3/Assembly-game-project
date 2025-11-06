export default function StatusPopup({ insertEl, style }) {
  console.log(insertEl);
  return (
    <section className={style}>
      <h2>{insertEl.header}</h2>
      <p>{insertEl.para || insertEl}</p>
    </section>
  );
}
