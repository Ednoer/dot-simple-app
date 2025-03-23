import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    SidebarContent,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NumberStepper } from "@/components/ui/number-stepper";
import CasForm from "@/layouts/acquisition/main/cas/cas-form";

export default function StepperDemo() {
    const steps = [
        { id: 1, label: "The CAS step contains information regarding the customer's background and biodata", child: <CasForm /> },
        { id: 2, label: "The CM step contains information Assets and Prices", child: <>Step 2</> },
        { id: 3, label: "The last step contains supporting information such as photos or others", child: <>Step 3</>},
      ];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarContent>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Acquistion
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Main</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>CAS</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-col gap-4 p-4 w-full">
                    <NumberStepper steps={steps}/>
                </div>
            </SidebarContent>
        </SidebarProvider>
    )
}
