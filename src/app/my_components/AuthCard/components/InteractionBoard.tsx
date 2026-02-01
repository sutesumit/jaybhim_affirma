import React from "react";
import { useInteractionAnalytics } from "../hooks/useInteractionAnalytics";
import { Heart } from "lucide-react";

interface InteractionBoardProps {
  className?: string;
}

const InteractionBoard: React.FC<InteractionBoardProps> = ({
  className = "",
}) => {
  const { data, loading, error, isAuthenticated } = useInteractionAnalytics();

  if (loading && !data) {
    return (
      <div className="flex flex-col pt-4 items-center justify-center text-white/40">
        <div className="loader2 opacity-50"></div>
        <span className="text-xs pt-2 text-[--primary-blue] tracking-widest opacity-50">
          Loading Best Pals..
        </span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={`text-[0.7rem] text-muted-foreground text-center ${className}`}>
        Interaction stats unavailable.
      </div>
    );
  }

  if (!data) return null;

  const { counters, topUser } = data;
  const hasMyInteractions = counters.myTotal > 0;
  const isTopUserMe = topUser?.is_me;

  return (
    <div className={`flex flex-col gap-1 items-center ${className}`}>
      {/* ───────── Personal Contribution ───────── */}
      {isAuthenticated && !isTopUserMe && (
        <div className="text-[0.7rem] text-muted-foreground text-center">
          {hasMyInteractions ? (
            <>
              Welcome back! You&apos;ve made{" "}
              <span className="font-semibold text-foreground">
                {counters.myTotal}
              </span>{" "}
              marks of support.
            </>
          ) : (
            <>Welcome! Show some <Heart className="w-2.5 h-2.5 inline-flex"/> with a like or comment</>
          )}
        </div>
      )}
      {/* ───────── Community Highlight ───────── */}
      {topUser && (
        <div className="text-xs text-center text-muted-foreground glass-hover p-2 rounded-sm w-full">
          {isAuthenticated && isTopUserMe ? (
            <span className="p-2">
              Thank you for being at the 💙 <br /> of the support. <span className="font-semibold text-foreground">{topUser.total}</span> interactions, the most so far!
            </span>
          ) : (
            <span className="p-2">
              Grateful for <span className="font-semibold text-foreground">{topUser.display_name}</span>'s <span className="font-semibold text-foreground">{topUser.total}</span> gestures of support, most so far!
            </span>
          )}
          <span className="flex justify-center items-center gap-0.5"><Heart className="w-2.5 h-2.5 inline-flex"/> Everyone’s total comments & likes: <span className="font-semibold text-foreground">{counters.globalTotal}</span></span>
        </div>
      )}
    </div>
  );
};

export default InteractionBoard;
