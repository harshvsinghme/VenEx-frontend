import { IPerformanceSummary } from "../types/common";

const PerformanceSummary = ({ summary }: IPerformanceSummary) => {
  return (
    <div className="mt-5">
      <p
        className="font-[600] text-[2.5em] text-center"
        style={{ color: "rgb(33, 150, 208)" }}
      >
        Performance Summary
      </p>
      <div className="flex flex-wrap gap-5 md:gap-0 justify-around mt-10">
        <div
          className="shadow-none rounded-xl h-[11em] w-[20em] bg-[#4e4fee] text-white"
          style={{ boxShadow: "5px 4px 16px -4px rgba(0, 0, 0, 0.75)" }}
        >
          <p className="text-3xl text-center mt-6">Productivity</p>
          <p className="text-center bg-[bl1ue] mt-[0.2em] text-[3em] font-bold">
            {summary.productivity}
          </p>
        </div>
        <div
          className="shadow-none rounded-xl h-[11em] w-[20em] bg-[#f943ad] text-white"
          style={{ boxShadow: "5px 4px 16px -4px rgba(0, 0, 0, 0.75)" }}
        >
          <p className="text-3xl text-center mt-6">Collaboration</p>
          <p className="text-center bg-[bl1ue] mt-[0.2em] text-[3em] font-bold">
            {summary.collaboration}
          </p>
        </div>
        <div
          className="shadow-none rounded-xl h-[11em] w-[20em] bg-[#ff3d7e] text-white"
          style={{ boxShadow: "5px 4px 16px -4px rgba(0, 0, 0, 0.75)" }}
        >
          <p className="text-3xl text-center mt-6">Communication</p>
          <p className="text-center bg-[bl1ue] mt-[0.2em] text-[3em] font-bold">
            {summary.communication}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
