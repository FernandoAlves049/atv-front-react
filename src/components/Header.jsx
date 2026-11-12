function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#estados" aria-label="Explorador do Brasil, início">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>explorador<span className="brand-light">.br</span></span>
      </a>
      <div className="header-note"><span className="header-dot" /> UM PAÍS, 27 HISTÓRIAS</div>
      <a className="header-source" href="https://www.ibge.gov.br/" target="_blank" rel="noreferrer">Fonte IBGE <span aria-hidden="true">↗</span></a>
    </header>
  )
}

export default Header
