import React from "react";
import { useInteractionAnalytics } from "../hooks/useInteractionAnalytics";
import { Heart } from "lucide-react";

interface ContributionSummaryProps {
  className?: string;
}

const ContributionSummary: React.FC<ContributionSummaryProps> = ({
  className = "",
}) => {
  const { data, loading, error, isAuthenticated } = useInteractionAnalytics();

  // Determine which content to show
  const showLoading = loading && !data;
  const showError = error && !data;
  const showData = !!data;

  // const showLoading = true;
  // const showError = false;
  // const showData = false;

  return (
    <div 
      className={`flex flex-col gap-1 w-full items-center text-sm overflow-hidden ${className}`}
    >
      
        {showLoading && (
          <div 
            className="flex flex-col sm:min-w-[20rem] pt-4 items-center justify-center text-white/40"
          >
            <div className="loader2 opacity-50"></div>
            <span className="text-xs pt-2 text-[--primary-blue] tracking-widest opacity-50">
              Loading Best Pals..
            </span>
          </div>
        )}

        {showError && (
          <div 
            className="text-[0.7rem] text-muted-foreground text-center"
          >
            Interaction stats unavailable.
          </div>
        )}

        {showData && (
          <div 
            className="flex flex-col gap-1 items-center w-full"
          >
            {/* ───────── Personal Contribution ───────── */}
            {isAuthenticated && !data.topUser?.is_me && (
              <div className="text-muted-foreground text-center">
                {data.counters.myTotal > 0 ? (
                  <>
                    Welcome back! You&apos;ve made{" "}
                    <span className="font-semibold text-foreground">
                      {data.counters.myTotal}
                    </span>{" "}
                    marks of support.
                  </>
                ) : (
                  <>Welcome! Show some <Heart className="w-2.5 h-2.5 inline-flex"/> with a like or comment</>
                )}
              </div>
            )}

            {/* ───────── Community Highlight ───────── */}
            {data.topUser && (
              <div className="text-center text-muted-foreground glass-hover p-1 rounded-sm w-full">
                {isAuthenticated && data.topUser.is_me ? (
                  <span className="p-2">
                    Thank you for being at the 💙 <br /> of the support. <span className="font-semibold text-foreground">{data.topUser.total}</span> interactions, the most so far!
                  </span>
                ) : (
                  <span className="p-2">
                    Grateful for <span className="font-semibold text-foreground">{data.topUser.display_name}</span>'s <span className="font-semibold text-foreground">{data.topUser.total}</span> gestures of support, most so far!
                  </span>
                )}
                <div className="flex sm:flex-row flex-col items-center justify-center gap-0.5"><Heart className="w-2.5 h-2.5"/> Everyone's total comments & likes: <span className="font-semibold text-foreground">{data.counters.globalTotal}</span></div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default ContributionSummary;
