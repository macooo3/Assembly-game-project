export default function StatusPopup({ insertEl, style }) {
 
  return (
    <section className={style} aria-live="polite" role="status">
      <h2>{insertEl.header}</h2>
      <p>{insertEl.para || insertEl}</p>
    </section>
  );
}
