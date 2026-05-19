import { getBezierPath } from '@xyflow/react';

/**
 * AnimatedEdge — Custom ReactFlow edge with:
 *  - A dim base stroke (30% opacity brand blue)
 *  - Two SVG animateMotion "data packet" dots
 *    travelling along the bezier at staggered offsets
 *  - A feGaussianBlur glow filter per edge
 *  - Brighter highlight stroke when the edge is selected
 */
export default function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  markerEnd,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const filterId = `glow-${id}`;

  return (
    <>
      {/* ── SVG filter definition ── */}
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Layer 1: dim base path ── */}
      <path
        id={`path-${id}`}
        d={edgePath}
        fill="none"
        stroke="#5865f2"
        strokeOpacity={selected ? 0.55 : 0.28}
        strokeWidth={selected ? 2 : 1.5}
        style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
      />

      {/* ── Layer 2: selected highlight ── */}
      {selected && (
        <path
          d={edgePath}
          fill="none"
          stroke="#a5b4fc"
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      )}

      {/* ── Layer 3: pulse dot 1 (leading) ── */}
      <circle r="3" fill="#a5b4fc" filter={`url(#${filterId})`}>
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>

      {/* ── Layer 4: pulse dot 2 (trailing, staggered by 1s) ── */}
      <circle r="2" fill="#818cf8" filter={`url(#${filterId})`} opacity="0.65">
        <animateMotion
          dur="2s"
          begin="-1s"
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>
    </>
  );
}
