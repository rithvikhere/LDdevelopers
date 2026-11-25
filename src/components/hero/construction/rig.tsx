import React from "react";
import { EDGE, url } from "./geometry";

/**
 * Figurine rig — a miniature construction-worker "action figure" built from layered, gradient-shaded parts.
 * Local coordinates: the figure faces right, feet on y = 0 (≈ 124 units to the top of the hard hat).
 * Each joint wraps a static pose angle (SVG attribute) around an animated group (CSS class); the CSS only
 * animates small deltas, so with reduced motion every figure simply holds its pose.
 */

export function Joint({
  at,
  angle = 0,
  anim,
  children,
}: {
  at: [number, number];
  angle?: number;
  anim?: string;
  children: React.ReactNode;
}) {
  const [x, y] = at;
  const inner = anim ? (
    <g className={anim} style={{ transformOrigin: `${x}px ${y}px` }}>
      {children}
    </g>
  ) : (
    children
  );
  return angle ? <g transform={`rotate(${angle} ${x} ${y})`}>{inner}</g> : <>{inner}</>;
}

export type Look = {
  skin: string;
  skinShade: string;
  shirt: string;
  shirtShade: string;
  rolledSleeves?: boolean;
  cuffLight?: string;
  legs: string;
  legsShade: string;
  trouserCuff?: string;
  boot: string;
  bootShade: string;
  glove?: string;
  hair: string;
  lips: string;
};

export type Pose = {
  torso?: number;
  head?: number;
  nearShoulder: number;
  nearElbow: number;
  nearWrist?: number;
  farShoulder: number;
  farElbow: number;
  nearHip?: number;
  farHip?: number;
  nearKnee?: number;
  farKnee?: number;
};

export type Anims = Partial<
  Record<
    | "torso"
    | "head"
    | "nearShoulder"
    | "nearElbow"
    | "nearWrist"
    | "farShoulder"
    | "farElbow"
    | "nearHip"
    | "nearKnee"
    | "nearAnkle",
    string
  >
>;

// Joint positions (local px)
export const NEAR_LEG = 7;
export const FAR_LEG = -3;
export const NEAR_ARM = 12;
export const FAR_ARM = -8;
export const HIP_Y = -54;
export const KNEE_Y = -31;
export const ANKLE_Y = -10;
export const SHOULDER_Y = -85;
export const ELBOW_Y = -68;
export const WRIST_Y = -51.5;
export const HAND: [number, number] = [NEAR_ARM, -48.5];
const NECK: [number, number] = [3, -92];
const WAIST: [number, number] = [2, -57];

function Boot({ c, fill, shade }: { c: number; fill: string; shade?: boolean }) {
  return (
    <g>
      <path
        d={`M${c - 7},-9.5 Q${c - 7.6},-14.2 ${c - 3},-14.2 L${c + 4},-14.2 Q${c + 7.2},-14.2 ${c + 9},-10.6 L${c + 13},-8.2 Q${c + 16.2},-6.6 ${c + 16.2},-3.6 L${c + 16.2},-2 L${c - 7.6},-2 Z`}
        fill={fill}
        {...EDGE}
      />
      <rect x={c - 8.2} y={-2.8} width={25} height={3.1} rx={1.4} fill={shade ? "#2F2A26" : "#3A332D"} />
      {!shade && (
        <path
          d={`M${c + 9.4},-9.4 Q${c + 13},-7.6 ${c + 14.6},-5.4`}
          stroke="#fff"
          strokeOpacity={0.35}
          strokeWidth={1.3}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <path d={`M${c - 1},-12.6 L${c + 6},-12.6`} stroke="#000" strokeOpacity={0.18} strokeWidth={0.9} />
    </g>
  );
}

function Leg({
  c,
  look,
  shade,
  hip = 0,
  knee = 0,
  anim,
}: {
  c: number;
  look: Look;
  shade?: boolean;
  hip?: number;
  knee?: number;
  anim?: { hip?: string; knee?: string; ankle?: string };
}) {
  const trousers = url(shade ? look.legsShade : look.legs);
  return (
    <Joint at={[c, HIP_Y]} angle={hip} anim={anim?.hip}>
      <rect x={c - 6.5} y={-58} width={13} height={29} rx={6} fill={trousers} {...EDGE} />
      <Joint at={[c, KNEE_Y]} angle={knee} anim={anim?.knee}>
        <rect x={c - 6} y={-34} width={12} height={24.5} rx={5.5} fill={trousers} {...EDGE} />
        {/* subtle fold at the knee */}
        <path d={`M${c - 4},-30 Q${c},-28.6 ${c + 4},-30`} stroke="#000" strokeOpacity={0.14} strokeWidth={0.8} fill="none" />
        {look.trouserCuff && <rect x={c - 6.8} y={-14.6} width={13.6} height={5} rx={2.4} fill={look.trouserCuff} {...EDGE} />}
        {/* the boot counter-rotates so it always sits flat on the ground */}
        <Joint at={[c, ANKLE_Y]} angle={-(hip + knee)} anim={anim?.ankle}>
          <Boot c={c} fill={url(shade ? look.bootShade : look.boot)} shade={shade} />
        </Joint>
      </Joint>
    </Joint>
  );
}

function Hand({ c, look, shade }: { c: number; look: Look; shade?: boolean }) {
  const fill = look.glove ? url(look.glove) : url(shade ? look.skinShade : look.skin);
  return (
    <g>
      <rect x={c - 4.6} y={-53.2} width={9.2} height={9.8} rx={4.3} fill={fill} {...EDGE} />
      <ellipse cx={c + 3.4} cy={-49.6} rx={1.9} ry={2.9} fill={fill} {...EDGE} />
      <path d={`M${c - 3.2},-46.4 L${c + 1.6},-46.4`} stroke="#000" strokeOpacity={0.16} strokeWidth={0.8} />
    </g>
  );
}

function Arm({
  c,
  look,
  shade,
  shoulder,
  elbow,
  wrist = 0,
  anim,
  item,
}: {
  c: number;
  look: Look;
  shade?: boolean;
  shoulder: number;
  elbow: number;
  wrist?: number;
  anim?: { shoulder?: string; elbow?: string; wrist?: string };
  item?: React.ReactNode;
}) {
  const sleeve = url(shade ? look.shirtShade : look.shirt);
  const forearm = look.rolledSleeves ? url(shade ? look.skinShade : look.skin) : sleeve;
  return (
    <Joint at={[c, SHOULDER_Y]} angle={shoulder} anim={anim?.shoulder}>
      <rect x={c - 5.6} y={-90.5} width={11.2} height={25} rx={5.6} fill={sleeve} {...EDGE} />
      <Joint at={[c, ELBOW_Y]} angle={elbow} anim={anim?.elbow}>
        <rect x={c - 4.6} y={-70.5} width={9.2} height={20.5} rx={4.6} fill={forearm} {...EDGE} />
        <Joint at={[c, WRIST_Y]} angle={wrist} anim={anim?.wrist}>
          <Hand c={c} look={look} shade={shade} />
          {item}
        </Joint>
      </Joint>
      {look.rolledSleeves && (
        <rect x={c - 6.1} y={-72.8} width={12.2} height={5.6} rx={2.7} fill={look.cuffLight ?? sleeve} {...EDGE} />
      )}
      {!shade && (
        <path
          d={`M${c - 3.6},-88 Q${c - 1},-90 ${c + 2.4},-89.4`}
          stroke="#fff"
          strokeOpacity={0.3}
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </Joint>
  );
}

function Head({ look, beard, mustache }: { look: Look; beard?: boolean; mustache?: boolean }) {
  return (
    <g>
      <ellipse cx={-6.2} cy={-103.4} rx={2.5} ry={3.4} fill={url(look.skinShade)} {...EDGE} />
      <path d="M-5.6,-104.6 Q-6.6,-103.4 -5.8,-102" stroke="#000" strokeOpacity={0.18} strokeWidth={0.7} fill="none" />
      <path
        d="M-8.8,-104.5 C-8.8,-113.6 -2.2,-117.6 4,-117.3 C10.6,-116.9 14.3,-111.6 13.9,-104.6 C13.7,-98 10,-93 3.8,-93 C-2.6,-93 -8.8,-97 -8.8,-104.5 Z"
        fill={url(look.skin)}
        {...EDGE}
      />
      <path
        d="M-8.7,-106.6 C-8.9,-111.4 -5.8,-114.4 -0.8,-114.6 L-2.4,-108.2 C-4.4,-106.6 -6.6,-104.2 -7.8,-100.6 C-8.6,-102.4 -8.8,-104.4 -8.7,-106.6 Z"
        fill={look.hair}
      />
      <ellipse cx={9.6} cy={-99.8} rx={2.3} ry={1.4} fill="#B4553F" opacity={0.16} />
      <path d="M3.6,-108.7 Q5.5,-109.9 7.5,-109" stroke="#33251C" strokeWidth={1.15} strokeLinecap="round" fill="none" />
      <path d="M9.7,-109 Q11.3,-109.7 12.7,-108.7" stroke="#33251C" strokeWidth={1.05} strokeLinecap="round" fill="none" />
      <ellipse cx={5.5} cy={-105.3} rx={1.25} ry={1.55} fill="#261B15" />
      <ellipse cx={11} cy={-105.3} rx={1.1} ry={1.45} fill="#261B15" />
      <circle cx={5.9} cy={-105.8} r={0.42} fill="#fff" opacity={0.85} />
      <circle cx={11.35} cy={-105.75} r={0.36} fill="#fff" opacity={0.8} />
      <path
        d="M12.7,-104.6 Q15.2,-101.6 12.5,-100.3"
        stroke="#000"
        strokeOpacity={0.22}
        strokeWidth={1.1}
        strokeLinecap="round"
        fill="none"
      />
      {beard ? (
        <>
          <path
            d="M-5.9,-100.6 C-5.1,-95 -0.6,-91 4.4,-91 C10,-91 13.7,-95 13.7,-99.8 C12.6,-98.1 11.1,-97.3 9.8,-97.7 C8.2,-98.7 6.6,-98.3 5.6,-97.5 C3.6,-98.5 1,-98.7 -1.4,-99.3 C-3,-99.7 -4.6,-100.3 -5.9,-100.6 Z"
            fill={look.hair}
          />
          <path d="M6.8,-98.6 Q10,-100.4 13,-98.9 Q10,-97.9 6.8,-98.6 Z" fill={look.hair} />
          <path d="M8.6,-96.4 Q10.2,-95.6 11.6,-96.5" stroke={look.lips} strokeWidth={0.9} strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          {mustache && <path d="M7,-98.4 Q10,-99.9 12.9,-98.6 Q10,-97.8 7,-98.4 Z" fill={look.hair} />}
          <path d="M8.3,-96.9 Q10.1,-95.8 11.8,-97" stroke={look.lips} strokeWidth={0.95} strokeLinecap="round" fill="none" />
        </>
      )}
      {/* hard hat */}
      <path
        d="M-10.6,-107.4 C-10.9,-117.6 -3.5,-123.6 3.6,-123.6 C11.6,-123.6 16.6,-117.6 16.3,-108.1 Z"
        fill={url("helmet")}
        {...EDGE}
      />
      <path d="M3.6,-123.6 C2.4,-118 2.3,-112.2 2.9,-108.2" stroke="#000" strokeOpacity={0.12} strokeWidth={2.2} fill="none" />
      <path
        d="M-12.6,-108.6 Q2,-111.3 19.6,-107.4 Q21.1,-105.6 18.5,-105 L-11.7,-105.8 Q-13.7,-106.6 -12.6,-108.6 Z"
        fill={url("helmetBrim")}
        {...EDGE}
      />
      <path
        d="M-6.4,-114.8 Q-3.4,-120.6 2.6,-121.6"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={1.9}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={8.8} cy={-119.2} rx={2.2} ry={1.1} fill="#fff" opacity={0.28} transform="rotate(20 8.8 -119.2)" />
    </g>
  );
}

const TORSO =
  "M-14,-83 Q-14,-91 -6,-92.5 L8,-92.5 Q16.5,-91.5 17,-83 L16.2,-62 Q15.5,-58.5 11.5,-58.5 L-8.5,-58.5 Q-13,-58.5 -13.2,-62 Z";
const HIPS = "M-11,-63 L16,-63 Q17,-55 15.4,-47.6 Q3,-44.6 -9.8,-47.6 Q-12,-55 -11,-63 Z";

export function Figure({
  look,
  pose,
  anim = {},
  torsoDetail,
  beard,
  mustache,
  nearItem,
  farItem,
  id,
  headId,
  nearArmId,
}: {
  look: Look;
  pose: Pose;
  anim?: Anims;
  torsoDetail?: React.ReactNode;
  beard?: boolean;
  mustache?: boolean;
  nearItem?: React.ReactNode;
  farItem?: React.ReactNode;
  id?: string;
  headId?: string;
  nearArmId?: string;
}) {
  return (
    <g id={id}>
      <ellipse cx={4} cy={0} rx={24} ry={4.4} fill={url("contact")} />
      <Leg c={FAR_LEG} look={look} shade hip={pose.farHip} knee={pose.farKnee} />
      <Leg
        c={NEAR_LEG}
        look={look}
        hip={pose.nearHip}
        knee={pose.nearKnee}
        anim={{ hip: anim.nearHip, knee: anim.nearKnee, ankle: anim.nearAnkle }}
      />
      <path d={HIPS} fill={url(look.legs)} {...EDGE} />
      <Joint at={WAIST} angle={pose.torso} anim={anim.torso}>
        <Arm
          c={FAR_ARM}
          look={look}
          shade
          shoulder={pose.farShoulder}
          elbow={pose.farElbow}
          anim={{ shoulder: anim.farShoulder, elbow: anim.farElbow }}
          item={farItem}
        />
        <path d={TORSO} fill={url(look.shirt)} {...EDGE} />
        {/* form shading: lit from the front-left, darker on the right flank */}
        <path
          d="M9.6,-92.3 Q16.5,-91.5 17,-83 L16.2,-62 Q15.5,-58.5 11.5,-58.5 L9.2,-58.5 Q12.4,-75 9.6,-92.3 Z"
          fill="#000"
          opacity={0.1}
        />
        <path
          d="M-11.8,-86 Q-10.6,-90.2 -5,-91.2"
          stroke="#fff"
          strokeOpacity={0.28}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
        {/* a sculpted fold across the waist */}
        <path d="M-10,-66 Q2,-63.6 14,-66.4" stroke="#000" strokeOpacity={0.1} strokeWidth={1} fill="none" />
        {torsoDetail}
        <rect x={-1.6} y={-96.5} width={8.6} height={7.5} rx={2.6} fill={url(look.skinShade)} />
        <g id={headId}>
          <Joint at={NECK} angle={pose.head} anim={anim.head}>
            <Head look={look} beard={beard} mustache={mustache} />
          </Joint>
        </g>
        <g id={nearArmId}>
          <Arm
            c={NEAR_ARM}
            look={look}
            shoulder={pose.nearShoulder}
            elbow={pose.nearElbow}
            wrist={pose.nearWrist}
            anim={{ shoulder: anim.nearShoulder, elbow: anim.nearElbow, wrist: anim.nearWrist }}
            item={nearItem}
          />
        </g>
      </Joint>
    </g>
  );
}

// ---------------------------------------------------------------- shared outfits / details ----

/** Safety vest over the shirt (muted hi-vis orange with reflective bands). */
export function Vest({ shirtV = "#4F6A85", belt = "#2F2E2B" }: { shirtV?: string; belt?: string }) {
  const outline =
    "M-13.8,-84 Q-13.8,-90.6 -6.6,-92.2 L-1.6,-92.2 L2.6,-79.6 L6.6,-92.2 L9.2,-92.2 Q16.4,-91.2 16.8,-84 L16,-61 L-13,-61 Z";
  return (
    <g>
      <path d="M-1.6,-92.4 L2.6,-79.6 L6.6,-92.4 Z" fill={shirtV} />
      <path d={outline} fill={url("vest")} {...EDGE} />
      <g clipPath="url(#lcs-vest-clip)">
        <rect x={-15} y={-78.4} width={34} height={3.4} fill="#ECE6D3" />
        <rect x={-15} y={-69.4} width={34} height={3.4} fill="#ECE6D3" />
        <rect x={-15} y={-78.4} width={34} height={0.8} fill="#fff" opacity={0.5} />
      </g>
      <path d="M2.6,-79.6 L2.4,-61" stroke="#000" strokeOpacity={0.25} strokeWidth={0.9} />
      <rect x={-13.4} y={-61.6} width={30} height={4.4} rx={1.4} fill={belt} {...EDGE} />
    </g>
  );
}

/** Work-shirt collar, placket, pocket and a leather belt. */
export function ShirtDetail({ skinShade, collar = "#C5D3AF", collarShade = "#B9C8A2" }: { skinShade: string; collar?: string; collarShade?: string }) {
  return (
    <g>
      <path d="M-1.2,-92.6 L2.6,-87.8 L5.6,-92.6 Z" fill={url(skinShade)} />
      <path d="M-4.2,-92.7 L1.8,-87 L2.2,-92.7 Z" fill={collar} {...EDGE} />
      <path d="M3.6,-92.7 L4.2,-87.2 L9,-92.5 Z" fill={collarShade} {...EDGE} />
      <path d="M3.4,-87 L3.4,-61" stroke="#000" strokeOpacity={0.16} strokeWidth={0.8} />
      <rect x={6.2} y={-84.2} width={7} height={6.2} rx={1} fill="none" stroke="#000" strokeOpacity={0.16} strokeWidth={0.8} />
      <rect x={-13.6} y={-61.8} width={30.2} height={5.2} rx={1.6} fill={url("leather")} {...EDGE} />
      <rect x={1.2} y={-61.4} width={4.4} height={4.4} rx={0.8} fill="none" stroke="#D9BC80" strokeWidth={1} />
    </g>
  );
}
