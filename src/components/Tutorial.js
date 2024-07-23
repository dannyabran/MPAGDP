import React, { useState } from 'react';
import '../App.css';

const Tutorial = () => {
    const steps = [
        {
            title: "Bem Vindo ao Remix da MPAGDP",
            body: "Aqui poderás fazer remisturas com os videos gravados por nós.<br></br> Segue este tutorial para saberes como utilizar esta nova ferramenta."
        },
        {
            title: "Escolher o Video",
            body: "No menu do lado direito tens uma lista de videos que podes escolher.<br></br> Seleciona um que gostes para começar."
        },
        {
            title: "Selecionar Segmento",
            body: "Com o video selecionado podes começar a explorar o teu lado criativo.<br></br> Utiliza as ondas para selecionares o segmento do video que queres cortar.<br></br> Para isso basta arrastar o cursor no tempo desejado."
        },
        {
            title: "Controlar os Segmentos",
            body: "Após selecionares um segmento, no menu em baixo, irá aparecer o segmento que criaste.<br></br> Podes criar vários segmentos e controlar individualmente cada um."
        },
        {
            title: "Diverte-te",
            body: "Agora que já conheces as funcionalidades do remix é hora de experimentares."
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleCloseTutorial = () => {
        setIsVisible(false);
    };

    const stepClasses = [
        'tutorial-step-0',
        'tutorial-step-1',
        'tutorial-step-2',
        'tutorial-step-3',
        'tutorial-step-4'
    ];

    return (
        isVisible && (
            <div className={`tutorial ${stepClasses[currentStep]}`}>
                <div className="Txt">
                    <h1>{steps[currentStep].title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: steps[currentStep].body }}></p>
                </div>
                <div className="botoes">
                    <p onClick={handleCloseTutorial}>Fechar Tutorial</p>
                    <p className='seguinte' onClick={handleNextStep}>Seguinte</p>
                </div>
            </div>
        )
    );
};

export default Tutorial;
