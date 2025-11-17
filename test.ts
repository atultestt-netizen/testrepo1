const parsedHeadline = cachedHeadline
      ? safeJsonParse<{ headline: string; daily_report: any }>(cachedHeadline)
      : null;
    // Check if the headline is cached
    if (parsedHeadline) {
      newHeadline = parsedHeadline.headline;
      daily_report = parsedHeadline.daily_report;
    } else {
      // cache miss OR invalid JSON
      newHeadline = await generateSimpleAIHeadline(
            
            user_profile);
      daily_report = await getTodaysReportForUser(user_profile._id);

      await redisClient?.set(
        hashKey,
        JSON.stringify({ headline: newHeadline, daily_report }),
        "EX",
        60 * 60 * HEADLINE_TTL_HOURS,
      );
    }
