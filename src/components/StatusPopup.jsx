export default function StatusPopup({ insertEl, style }) {
  return (
    <section className={style}>
      <h2>{insertEl.header}</h2>
      <p>{insertEl.para}</p>
    </section>
  );
}
