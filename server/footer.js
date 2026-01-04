(() => {
    const version = '{{VERSION}}';
    const footer = document.createElement('footer');

    const infoDiv = document.createElement('div');

    const versionSpan = document.createElement('span');
    versionSpan.textContent = `Versión de la infraestructura: ${version}`;

    const separator = document.createTextNode(' | ');

    const link = document.createElement('a');
    link.href = 'https://github.com/sierrapablo/portfolio-web-infra';
    link.textContent = 'Ver código fuente';
    link.target = '_blank';

    infoDiv.appendChild(versionSpan);
    infoDiv.appendChild(separator);
    infoDiv.appendChild(link);

    const copyrightDiv = document.createElement('div');
    copyrightDiv.textContent = '© 2026 Pablo Sierra Lorente. Todos los derechos reservados.';

    footer.appendChild(infoDiv);
    footer.appendChild(copyrightDiv);

    document.body.appendChild(footer);
})();