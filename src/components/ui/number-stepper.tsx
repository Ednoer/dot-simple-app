import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Step = {
    id: number;
    label: string;
    child: ReactNode;
};

interface NumberStepperProps {
    steps: Step[];
}

export const NumberStepper: React.FC<NumberStepperProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <>
            <TooltipProvider>
                <div className="w-full max-w-lg mx-auto space-y-6">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-center gap-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                                {/* Tooltip Wrapper */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {/* Circle */}
                                        <div
                                            className={cn(
                                                "flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer",
                                                currentStep >= index ? "border-primary bg-primary text-white" : "border-gray-300 text-gray-500"
                                            )}
                                        >
                                            {step.id}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{step.label}</p>
                                    </TooltipContent>
                                </Tooltip>

                                {/* Line (kecuali langkah terakhir) */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "w-12 h-[2px] mx-2",
                                            currentStep >= index + 1 ? "bg-primary" : "bg-gray-300"
                                        )}
                                    />
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </TooltipProvider>
            <div>
                {
                    steps[currentStep].child
                }
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                    Back
                </Button>
                <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
                    Next
                </Button>
            </div>
        </>
    );
}
