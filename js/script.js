class GetValores {
    constructor() {
        this.formulario = document.getElementById('ordemServico');
        this.resultados = document.getElementById('resultados');
        this.botaoCopiar = document.getElementById("btn-copiar");
        this.botaoCopiar.addEventListener("click", () => this.copiarParaAreaDeTransferencia());

        this.formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            this.enviarTextos();
            this.limparCampos();
        });
    }

    enviarTextos() {
        const base = this.formulario.querySelector('#base').value;
        const olt = this.formulario.querySelector('#olt').value;
        const olt2 = this.formulario.querySelector('#olt2').value;
        const lineProfile = this.formulario.querySelector('#lineProfile').value;
        const nOnu = this.formulario.querySelector('#nOnu').value;
        const nome = this.formulario.querySelector('#nome').value;
        const serial = this.formulario.querySelector('#serial').value;
        const servicePort1 = this.formulario.querySelector('#servicePort1').value;
        const servicePort2 = this.formulario.querySelector('#servicePort2').value;
        const ramo = this.formulario.querySelector('#ramo').value;
        const vlan = this.formulario.querySelector('#vlan').value;
        const placa = this.formulario.querySelector('#placa').value;

        this.resultados.innerHTML = '';

        if (base === 'WLAN' && olt === 'HUAWEI' && olt2 === 'WLAN') {
            if (lineProfile === 'ROUTER') {
                this.adicionarLista([
                    `conf`,
                    `interface gpon ${placa}`,
                    `ont add ${ramo} sn-auth ${serial} omci ont-lineprofile-id 2440 ont-srvprofile-id 2440 desc "${nome}"`,
                    `ont ipconfig ${ramo} ${nOnu} ip-index 1 dhcp vlan 110 priority 5`,
                    `ont tr069-server-config ${ramo} ${nOnu} profile-id 30`,
                    `quit`,
                    `service-port vlan ${vlan} gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan ${vlan} tag-transform translate`,
                    `service-port vlan 110 gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan 110 tag-transform translate`
                ]);
            } else if (lineProfile === 'BRIDGE') {
                this.adicionarLista([
                    `conf`,
                    `interface gpon ${placa}`,
                    `ont add ${ramo} sn-auth ${serial} omci ont-lineprofile-id 2440 ont-srvprofile-id 2440 desc "${nome}"`,
                    `ont port native-vlan ${ramo} ${nOnu} eth 1 vlan ${vlan} priority 0`,
                    `ont tr069-server-config ${ramo} ${nOnu} profile-id 30`,
                    `quit`,
                    `service-port vlan 110 gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan 110 tag-transform translate`,
                    `service-port vlan ${vlan} gpon ${placa}/${ramo} ont ${nOnu} gemport 126 multi-service user-vlan ${vlan} tag-transform translate`
                ]);
            }
        }
    }

    adicionarLista(items) {
        items.forEach(itemText => {
            const item = document.createElement('li');
            item.textContent = itemText;
            this.resultados.appendChild(item);
        });
    }

    limparCampos() {
        const campos = ['nOnu', 'placa', 'nome', 'ramo', 'serial', 'servicePort1', 'servicePort2', 'vlan'];
        campos.forEach(id => {
            this.formulario.querySelector(`#${id}`).value = '';
        });
    }

    copiarParaAreaDeTransferencia() {
        const listaTexto = Array.from(this.resultados.querySelectorAll("li")).map(item => item.textContent).join("\n");
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
