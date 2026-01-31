import React from "react";
import { useInteractionAnalytics } from "../hooks/useInteractionAnalytics";

interface InteractionBoardProps {
  className?: string;
}

const InteractionBoard: React.FC<InteractionBoardProps> = ({
  className = "",
}) => {
  const { data, loading, error, isAuthenticated } = useInteractionAnalytics();

  if (loading && !data) {
    return (
      <div className={`text-[0.7rem] text-muted-foreground text-center ${className}`}>
        Loading interaction stats&hellip;
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
              Welcome back! You&apos;ve left{" "}
              <span className="font-semibold text-foreground">
                {counters.myTotal}
              </span>{" "}
              marks of support.
            </>
          ) : (
            <>Welcome! Do like/comment to show support</>
          )}
        </div>
      )}
      {/* ───────── Community Highlight ───────── */}
      {topUser && (
        <div className="text-xs text-center text-muted-foreground">
          {isAuthenticated && isTopUserMe ? (
            <span>
              Thank you for being at the 💙 heart of the support here with <span className="font-semibold text-foreground">{topUser.total}</span> moments!
            </span>
          ) : (
            <span>
              Thanking <span className="font-semibold text-foreground">{topUser.display_name}</span> for showing up <span className="font-semibold text-foreground">{topUser.total}</span> times!
            </span>
          )}
          <span className="block">Comments and likes so far: <span className="font-semibold text-foreground">{counters.globalTotal}</span></span>
        </div>
      )}
    </div>
  );
};

export default InteractionBoard;
