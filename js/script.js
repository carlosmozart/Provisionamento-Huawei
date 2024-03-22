
class GetValores {
    constructor() {
        this.formulario = document.getElementById('ordemServico');
        this.resultados = document.getElementById('resultados');
        this.formulario.addEventListener('submit', this.enviarTextos.bind(this));
        this.botaoCopiar = document.getElementById("btn-copiar");
        this.minhaLista = document.getElementById("resultados");
        this.botaoCopiar.addEventListener("click", () => this.copiarParaAreaDeTransferencia());
    }

    enviarTextos(event) {
        event.preventDefault();

        const base = document.getElementById('base').value;
        const olt = document.getElementById('olt').value;
        const olt2 = document.getElementById('olt2').value;
        const lineProfile = document.getElementById('lineProfile').value;
        const nOnu = document.getElementById('nOnu').value;
        const nome = document.getElementById('nome').value;
        const serial = document.getElementById('serial').value;
        const servicePort1 = document.getElementById('servicePort1').value;
        const servicePort2 = document.getElementById('servicePort2').value;
        const ramo = document.getElementById('ramo').value;
        const vlan = document.getElementById('vlan').value;
        const placa = document.getElementById('placa').value;

        this.resultados.innerHTML = '';

        document.getElementById('nOnu').value = '';
        document.getElementById('placa').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('ramo').value = '';
        document.getElementById('serial').value = '';
        document.getElementById('servicePort1').value = '';
        document.getElementById('servicePort2').value = '';
        document.getElementById('vlan').value = '';

        if (base == 'WLAN' && olt == 'HUAWEI' && olt2 == 'WLAN' && lineProfile == 'ROUTER') {
            const resultadoLinhaB2 = document.createElement('li');
            resultadoLinhaB2.textContent = `conf`;
            this.resultados.appendChild(resultadoLinhaB2);

            const resultadoPlaca = document.createElement('li');
            resultadoPlaca.textContent = `interface gpon ${placa}`;
            this.resultados.appendChild(resultadoPlaca);

            const resultadoRamo = document.createElement('li');
            resultadoRamo.textContent = `ont add ${ramo} sn-auth ${serial} omci ont-lineprofile-id 2440 ont-srvprofile-id 2440 desc "${nome}"`;
            this.resultados.appendChild(resultadoRamo);

            const resultadonOnu = document.createElement('li');
            resultadonOnu.textContent = `ont ipconfig ${ramo} ${nOnu} ip-index 1 dhcp vlan 110 priority 5`;
            this.resultados.appendChild(resultadonOnu);

            const resultadoLinhaB6 = document.createElement('li');
            resultadoLinhaB6.textContent = `ont tr069-server-config ${ramo} ${nOnu} profile-id 30`;
            this.resultados.appendChild(resultadoLinhaB6);

            const resultadoLinhaB7 = document.createElement('li');
            resultadoLinhaB7.textContent = `quit`;
            this.resultados.appendChild(resultadoLinhaB7);

            const resultadoLinhaB3 = document.createElement('li');
            resultadoLinhaB3.textContent = `service-port vlan ${vlan} gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan ${vlan} tag-transform translate`;
            this.resultados.appendChild(resultadoLinhaB3);

            const resultadoLinhaB4 = document.createElement('li');
            resultadoLinhaB4.textContent = `service-port vlan 110 gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan 110 tag-transform translate`;
            this.resultados.appendChild(resultadoLinhaB4);

        }

        if (base == 'WLAN' && olt == 'HUAWEI' && olt2 == 'WLAN' && lineProfile == 'BRIDGE') {

            const resultadoLinhaB2 = document.createElement('li');
            resultadoLinhaB2.textContent = `conf`;
            this.resultados.appendChild(resultadoLinhaB2);

            const resultadoPlaca = document.createElement('li');
            resultadoPlaca.textContent = `interface gpon ${placa}`;
            this.resultados.appendChild(resultadoPlaca);

            const resultadoRamo = document.createElement('li');
            resultadoRamo.textContent = `ont add ${ramo} sn-auth ${serial} omci ont-lineprofile-id 2440 ont-srvprofile-id 2440 desc "${nome}"`;
            this.resultados.appendChild(resultadoRamo);

            const resultadonOnu = document.createElement('li');
            resultadonOnu.textContent = `ont port native-vlan ${ramo} ${nOnu} eth 1 vlan ${vlan} priority 0`;
            this.resultados.appendChild(resultadonOnu);

            const resultadoLinhaB6 = document.createElement('li');
            resultadoLinhaB6.textContent = `ont tr069-server-config ${ramo} ${nOnu} profile-id 30`;
            this.resultados.appendChild(resultadoLinhaB6);

            const resultadoLinhaB7 = document.createElement('li');
            resultadoLinhaB7.textContent = `quit`;
            this.resultados.appendChild(resultadoLinhaB7);

            const resultadoLinhaB3 = document.createElement('li');
            resultadoLinhaB3.textContent = `service-port vlan 110 gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan 110 tag-transform translate`;
            this.resultados.appendChild(resultadoLinhaB3);

            const resultadoLinhaB4 = document.createElement('li');
            resultadoLinhaB4.textContent = `service-port vlan ${vlan} gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan ${vlan} tag-transform translate`;
            this.resultados.appendChild(resultadoLinhaB4);

        }

    }


    copiarParaAreaDeTransferencia() {

        const listaTexto = Array.from(this.minhaLista.querySelectorAll("li"))
            .map(item => item.textContent)
            .join("\n");

        const textarea = document.createElement("textarea");
        textarea.value = listaTexto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Lista copiada para a área de transferência!");
    }


}






window.addEventListener('load', () => {
    const minhaInstancia = new GetValores();
});

