const STRATEGY_STAND_BY = 0;
const STRATEGY_ACTIVE = 1;
const STRATEGY_SUCCESS = 2;
const STRATEGY_FAIL = 3;
const STRATEGY_USELESS = 4;
const STRATEGY_TREND_TO_SUCCESS = "STRATEGY_TREND_TO_SUCCESS";
const STRATEGY_TREND_TO_FAIL = "STRATEGY_TREND_TO_FAIL";

export function getTheShowingStrategy(strategies) {
  if (strategies && strategies.length) {
    const length = strategies.length;

    if (length === 2) {
      const status = strategies[1].status;
      if (
        status === STRATEGY_ACTIVE ||
        status === STRATEGY_SUCCESS ||
        status === STRATEGY_FAIL ||
        status === STRATEGY_TREND_TO_FAIL ||
        status === STRATEGY_TREND_TO_SUCCESS
      ) {
        return strategies[1];
      }
    }

    return strategies[0];
  }

  throw Error("error, strategies is invalid : ", strategies);
}

export function isUsefulStrategy(strategy) {
  try {
    const { entry, direction, stop_lost, take_profit } = strategy;
    if (+entry > 0 && +stop_lost > 0 && +take_profit > 0) {
      if (direction === "long") {
        return +take_profit > +entry && +entry > +stop_lost;
      } else if (direction === "short") {
        return +take_profit < +entry && +entry < +stop_lost;
      }
    }
  } catch (err) {}
}

export function isValidStrategy(strategy) {
  try {
    const { entry, direction, stop_lost, take_profit } = strategy;
    if (
      typeof +entry === "number" &&
      typeof +stop_lost === "number" &&
      typeof +take_profit === "number" &&
      (direction === "long" || direction === "short")
    ) {
      return !!1;
    }
  } catch (err) {}
}

export function calcStrategyStatus({ strategy, previousValue, currentValue }) {
  if (
    typeof +previousValue === "number" &&
    typeof +currentValue === "number" &&
    +previousValue > 0 &&
    +currentValue > 0
  ) {
    const { entry, direction, stop_lost, take_profit, status } = strategy;

    if (
      status === STRATEGY_SUCCESS ||
      status === STRATEGY_FAIL ||
      status === STRATEGY_USELESS
    ) {
      return status;
    }

    let _status = status;
    if (_status === STRATEGY_STAND_BY) {
      if (
        (+previousValue < +entry && +currentValue >= +entry) ||
        (+previousValue > +entry && +currentValue <= +entry)
      ) {
        _status = STRATEGY_ACTIVE;
      }
    }

    if (
      _status === STRATEGY_ACTIVE ||
      _status === STRATEGY_TREND_TO_FAIL ||
      _status === STRATEGY_TREND_TO_SUCCESS
    ) {
      if (direction === "short") {
        if (+currentValue >= +stop_lost) {
          _status = STRATEGY_FAIL;
        } else if (+currentValue >= +entry && +currentValue < +stop_lost) {
          _status = STRATEGY_TREND_TO_FAIL;
        } else if (+currentValue <= +take_profit) {
          _status = STRATEGY_SUCCESS;
        } else if (+currentValue < +entry && +currentValue > +take_profit) {
          _status = STRATEGY_TREND_TO_SUCCESS;
        }
      } else if (direction === "long") {
        if (+currentValue >= +take_profit) {
          _status = STRATEGY_SUCCESS;
        } else if (+currentValue >= +entry && +currentValue < +take_profit) {
          _status = STRATEGY_TREND_TO_SUCCESS;
        } else if (+currentValue <= +stop_lost) {
          _status = STRATEGY_FAIL;
        } else if (+currentValue < +entry && +currentValue > +stop_lost) {
          _status = STRATEGY_TREND_TO_FAIL;
        }
      }
    }

    return _status;
  } else {
    return strategy.status;
  }
}

export function generateUpdateStrategiesActions({
  strategies,
  previousValue,
  currentValue,
  analysisId
}) {
  if (strategies.length === 1) {
    if (
      strategies[0].status === STRATEGY_USELESS ||
      strategies[0].status === STRATEGY_SUCCESS ||
      strategies[0].status === STRATEGY_FAIL
    ) {
      return;
    }

    if (!isUsefulStrategy(strategies[0])) {
      return [
        {
          analysisId,
          strategyId: strategies[0].id,
          status: STRATEGY_USELESS
        }
      ];
    } else {
      const status = calcStrategyStatus({
        strategy: strategies[0],
        previousValue,
        currentValue
      });

      if (status !== strategies[0].status) {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status
          }
        ];
      }
    }
  } else if (strategies.length === 2) {
    if (
      strategies[0].status === STRATEGY_SUCCESS ||
      strategies[0].status === STRATEGY_FAIL ||
      strategies[1].status === STRATEGY_SUCCESS ||
      strategies[1].status === STRATEGY_FAIL
    ) {
      return;
    }

    if (
      strategies[0].status === STRATEGY_USELESS &&
      strategies[1].status === STRATEGY_USELESS
    )
      return;

    if (strategies[0].status === STRATEGY_USELESS) {
      if (!isUsefulStrategy(strategies[1])) {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          }
        ];
      } else {
        const status = calcStrategyStatus({
          strategy: strategies[1],
          previousValue,
          currentValue
        });

        if (status !== strategies[1].status) {
          return [
            {
              analysisId,
              strategyId: strategies[1].id,
              status
            }
          ];
        }
        return;
      }
    } else if (strategies[1].status === STRATEGY_USELESS) {
      if (!isUsefulStrategy(strategies[0])) {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          }
        ];
      } else {
        const status = calcStrategyStatus({
          strategy: strategies[0],
          previousValue,
          currentValue
        });

        if (status !== strategies[0].status) {
          return [
            {
              analysisId,
              strategyId: strategies[0].id,
              status
            }
          ];
        }
        return;
      }
    }

    if (!isUsefulStrategy(strategies[0]) && !isUsefulStrategy(strategies[1])) {
      return [
        {
          analysisId,
          strategyId: strategies[0].id,
          status: STRATEGY_USELESS
        },
        {
          analysisId,
          strategyId: strategies[1].id,
          status: STRATEGY_USELESS
        }
      ];
    }

    if (!isUsefulStrategy(strategies[0])) {
      const status = calcStrategyStatus({
        strategy: strategies[1],
        previousValue,
        currentValue
      });

      if (status !== strategies[1].status) {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          },
          {
            analysisId,
            strategyId: strategies[1].id,
            status
          }
        ];
      } else {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          }
        ];
      }
    }

    if (!isUsefulStrategy(strategies[1])) {
      const status = calcStrategyStatus({
        strategy: strategies[0],
        previousValue,
        currentValue
      });

      if (status !== strategies[0].status) {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          },
          {
            analysisId,
            strategyId: strategies[0].id,
            status
          }
        ];
      } else {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          }
        ];
      }
    }

    const status0 = calcStrategyStatus({
      strategy: strategies[0],
      previousValue,
      currentValue
    });

    const status1 = calcStrategyStatus({
      strategy: strategies[1],
      previousValue,
      currentValue
    });

    if (
      strategies[0].status === STRATEGY_STAND_BY &&
      strategies[1].status === STRATEGY_STAND_BY
    ) {
      if (status0 !== strategies[0].status) {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: status0
          },
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          }
        ];
      } else if (status1 !== strategies[1].status) {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: status1
          },
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          }
        ];
      }
      return;
    }

    if (
      strategies[0].status !== STRATEGY_STAND_BY &&
      strategies[1].status === STRATEGY_STAND_BY
    ) {
      if (status0 !== strategies[0].status) {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: status0
          },
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          }
        ];
      } else {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: STRATEGY_USELESS
          }
        ];
      }
    }

    if (
      strategies[1].status !== STRATEGY_STAND_BY &&
      strategies[0].status === STRATEGY_STAND_BY
    ) {
      if (status1 !== strategies[1].status) {
        return [
          {
            analysisId,
            strategyId: strategies[1].id,
            status: status1
          },
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          }
        ];
      } else {
        return [
          {
            analysisId,
            strategyId: strategies[0].id,
            status: STRATEGY_USELESS
          }
        ];
      }
    }

    if (status0 !== strategies[0].status) {
      return [
        {
          analysisId,
          strategyId: strategies[0].id,
          status: status0
        },
        {
          analysisId,
          strategyId: strategies[1].id,
          status: STRATEGY_USELESS
        }
      ];
    } else {
      return [
        {
          analysisId,
          strategyId: strategies[1].id,
          status: STRATEGY_USELESS
        }
      ];
    }
  }
}

export {
  STRATEGY_STAND_BY,
  STRATEGY_ACTIVE,
  STRATEGY_SUCCESS,
  STRATEGY_FAIL,
  STRATEGY_TREND_TO_SUCCESS,
  STRATEGY_USELESS,
  STRATEGY_TREND_TO_FAIL
};
