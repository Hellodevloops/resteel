<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::table('contacts', function (Blueprint $table) {
      $table->string('building_category')->nullable()->after('message');
      $table->string('building_type')->nullable()->after('building_category');
      $table->string('building_width')->nullable()->after('building_type');
      $table->string('building_length')->nullable()->after('building_width');
      $table->string('gutter_height')->nullable()->after('building_length');
      $table->string('top_height')->nullable()->after('gutter_height');
    });

---

**Rewritten Prompt:**

> I have created a directory at `resources/js/pages/Content`, which is intended to make specific frontend components dynamic. Any changes made through this directory should be reflected directly on the frontend of the application.
>
> The following components/sections need to be dynamic:
>
> ---
>
> **1. About Page Sections** (`resources/js/pages/website/About.tsx`)
> Only the following sections from the About page should be dynamic:
>
> * **Company Story** → `{/* Company Story */}: Who We Are`
> * **Mission Section** → `{/* Mission Section */}: Our Mission`
> * **What We Offer** → `{/* What We Offer */}`
> * **Stats Section** → `{/* Stats Section */}: Across Borders`
>
> ---
>
> **2. Why Choose Us**
>
> * Entire component should be dynamic
> * File: `resources/js/components/FeaturesPreview.tsx`
>
> ---
>
> **3. Services We Provide**
>
> * Entire component should be dynamic
> * File: `resources/js/pages/website/Services.tsx`
>
> ---
>
> **Note:**
> If any of the above components already support multi-language functionality, make sure that **language-switching logic is removed form that component**
>
> I’ve also attached images of the components to visually indicate which sections need to be dynamic.

---

  }

  public function down(): void
  {
    Schema::table('contacts', function (Blueprint $table) {
      $table->dropColumn([
        'building_type',
        'building_width',
        'building_length',
        'gutter_height',
        'top_height'
      ]);
    });
  }
};
