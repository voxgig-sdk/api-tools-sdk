# ApiTools SDK utility: feature_add
module ApiToolsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
