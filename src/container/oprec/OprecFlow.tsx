import { useOprecFlow } from "@/hooks/useOprecFlow";
import OprecShell from "./Modules/OprecShell";
import BeforeOpenView from "./Modules/BeforeOpenView";
import AfterCloseView from "./Modules/AfterCloseView";
import AnnouncedView from "./Modules/AnnouncedView";
import OprecForm from "./Modules/OprecForm";

const Oprec = () => {
    const { phase, remaining, openAt, closeAt, announceAt } = useOprecFlow();

    return (
        <OprecShell>
            {phase === "BEFORE_OPEN" && (
                <BeforeOpenView openAt={openAt} remaining={remaining} />
            )}

            {phase === "OPEN" && <OprecForm closeAt={closeAt} />}

            {phase === "AFTER_CLOSE" && (
                <AfterCloseView announceAt={announceAt} remaining={remaining} />
            )}

            {phase === "ANNOUNCED" && <AnnouncedView />}
        </OprecShell>
    );
}

export default Oprec;