import { useState, useMemo } from 'react';
import { BIAS_STATES, COLOR_SCHEME } from '../constants';

/**
 * Hook for calculating bias and impact analysis
 */
export const useBiasAnalysis = (eurUsdChangePct, audUsdChangePct) => {
  const childChangePct = useMemo(() => {
    return eurUsdChangePct - audUsdChangePct;
  }, [eurUsdChangePct, audUsdChangePct]);

  const childBias = useMemo(() => {
    if (childChangePct > 0.6) {
      return {
        label: BIAS_STATES.ULTRA_BULLISH,
        color: COLOR_SCHEME.ultra_bullish,
        score: 95,
      };
    }
    if (childChangePct > 0.15) {
      return {
        label: BIAS_STATES.BULLISH,
        color: COLOR_SCHEME.bullish,
        score: 70,
      };
    }
    if (childChangePct < -0.6) {
      return {
        label: BIAS_STATES.ULTRA_BEARISH,
        color: COLOR_SCHEME.ultra_bearish,
        score: -95,
      };
    }
    if (childChangePct < -0.15) {
      return {
        label: BIAS_STATES.BEARISH,
        color: COLOR_SCHEME.bearish,
        score: -70,
      };
    }
    return {
      label: BIAS_STATES.NEUTRAL,
      color: COLOR_SCHEME.neutral,
      score: 0,
    };
  }, [childChangePct]);

  const influence = useMemo(() => {
    const absDad = Math.abs(eurUsdChangePct);
    const absMom = Math.abs(audUsdChangePct);
    const total = absDad + absMom || 1;
    return {
      dadPct: Math.round((absDad / total) * 100),
      momPct: Math.round((absMom / total) * 100),
      dadAbsolute: absDad,
      momAbsolute: absMom,
    };
  }, [eurUsdChangePct, audUsdChangePct]);

  const calculateNewsImpact = (newsItem) => {
    const impactMultiplier =
      newsItem.impact === 'High' ? 1.0 : newsItem.impact === 'Medium' ? 0.5 : 0.2;

    let netDirectionScore = 0;
    if (newsItem.currency === 'EUR') {
      netDirectionScore = newsItem.sentiment * impactMultiplier;
    }
    if (newsItem.currency === 'AUD') {
      netDirectionScore = -newsItem.sentiment * impactMultiplier;
    }
    if (newsItem.currency === 'USD') {
      netDirectionScore = newsItem.sentiment * 0.1 * impactMultiplier;
    }

    const direction =
      netDirectionScore > 0.15
        ? 'BULLISH'
        : netDirectionScore < -0.15
        ? 'BEARISH'
        : 'NEUTRAL';
    const impactMagnitudePct = Math.round(Math.abs(netDirectionScore) * 100);

    return { direction, impactMagnitudePct, netDirectionScore };
  };

  return {
    childChangePct,
    childBias,
    influence,
    calculateNewsImpact,
  };
};
