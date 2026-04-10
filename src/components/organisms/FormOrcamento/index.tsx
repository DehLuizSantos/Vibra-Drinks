import Steeper from "../Steeper"

export default function FormOrcamento() {
    const steepsOrcamento = [
        {
            image: '/images/orcamento/section1.png',
            steep: 'pessoais',
            steepNumber: 1,
            inputs: [
                {
                    label: 'Nome',
                    value: '',
                    type: 'text'
                },
                {
                    label: 'Telefone',
                    value: '',
                    type: 'phone'
                },
                {
                    label: 'Email',
                    value: '',
                    type: 'email'
                },
                {

                }
            ]
        },
        {
            image: '/images/orcamento/section2.png',
            steep: 'evento',
            steepNumber: 2,
            inputs: [
                {
                    label: 'Tipo de evento',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'Número de convidados',
                    value: '',
                    type: 'number'
                },
                {
                    label: 'Data do Evento',
                    value: '',
                    type: 'date'
                },
                {
                    label: 'Duração do Evento',
                    value: '',
                    type: 'date'
                },
                {
                    label: 'possui local para Evento',
                    value: '',
                    type: 'option'
                },

            ]
        },
        {
            image: '/images/orcamento/section3.png',
            steep: 'variaveis-evento',
            steepNumber: 3,
            inputs: [
                {
                    label: 'TIPO DE COPOS E TAÇAS',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'TIPO DE BAR',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'QUANTIDADE DE DRINKS',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'SELECIONE SEUS DRINKS',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'TAGS PERSONALIZADAS',
                    value: '',
                    type: 'select'
                },
                {
                    label: 'TIPO DE XAROPE / AÇUCAR',
                    value: '',
                    type: 'select'
                },

            ]
        },

    ]
    return (
        <div>
            <Steeper />
        </div>
    )
}