export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      Book: {
        Row: {
          author: string;
          coverImgUrl: string;
          description: string;
          id: number;
          publisher: string;
          searchIndex: string;
          subTitle: string;
          title: string;
        };
        Insert: {
          author: string;
          coverImgUrl: string;
          description: string;
          id?: number;
          publisher: string;
          searchIndex?: string;
          subTitle: string;
          title: string;
        };
        Update: {
          author?: string;
          coverImgUrl?: string;
          description?: string;
          id?: number;
          publisher?: string;
          searchIndex?: string;
          subTitle?: string;
          title?: string;
        };
        Relationships: [];
      };
      daily_video_stats: {
        Row: {
          created_at: string;
          date: string;
          id: string;
          like_count: number;
          video_id: string;
          view_count: number;
        };
        Insert: {
          created_at?: string;
          date?: string;
          id?: string;
          like_count?: number;
          video_id: string;
          view_count?: number;
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: string;
          like_count?: number;
          video_id?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'daily_video_stats_video_id_fkey';
            columns: ['video_id'];
            isOneToOne: false;
            referencedRelation: 'youtube_videos';
            referencedColumns: ['video_id'];
          }
        ];
      };
      movie: {
        Row: {
          id: number;
          image_url: string;
          overview: string;
          popularity: number;
          release_date: string;
          title: string;
          vote_average: number;
        };
        Insert: {
          id?: number;
          image_url: string;
          overview: string;
          popularity: number;
          release_date: string;
          title: string;
          vote_average: number;
        };
        Update: {
          id?: number;
          image_url?: string;
          overview?: string;
          popularity?: number;
          release_date?: string;
          title?: string;
          vote_average?: number;
        };
        Relationships: [];
      };
      Review: {
        Row: {
          author: string;
          bookId: number;
          content: string;
          createdAt: string;
          id: number;
        };
        Insert: {
          author: string;
          bookId: number;
          content: string;
          createdAt?: string;
          id?: number;
        };
        Update: {
          author?: string;
          bookId?: number;
          content?: string;
          createdAt?: string;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Review_bookId_fkey';
            columns: ['bookId'];
            isOneToOne: false;
            referencedRelation: 'Book';
            referencedColumns: ['id'];
          }
        ];
      };
      todo: {
        Row: {
          completed: boolean;
          created_at: string;
          id: number;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          completed: boolean;
          created_at?: string;
          id?: number;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          id?: number;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      youtube_videos: {
        Row: {
          channel_id: string;
          channel_title: string;
          created_at: string;
          description: string | null;
          id: string;
          like_count: number;
          playlist_id: string;
          playlist_type: string;
          position: number;
          published_at: string;
          thumbnail_url: string;
          title: string;
          updated_at: string;
          video_id: string;
          video_owner_channel_title: string | null;
          view_count: number;
        };
        Insert: {
          channel_id: string;
          channel_title: string;
          created_at: string;
          description?: string | null;
          id?: string;
          like_count?: number;
          playlist_id: string;
          playlist_type: string;
          position: number;
          published_at: string;
          thumbnail_url: string;
          title: string;
          updated_at: string;
          video_id: string;
          video_owner_channel_title?: string | null;
          view_count?: number;
        };
        Update: {
          channel_id?: string;
          channel_title?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          like_count?: number;
          playlist_id?: string;
          playlist_type?: string;
          position?: number;
          published_at?: string;
          thumbnail_url?: string;
          title?: string;
          updated_at?: string;
          video_id?: string;
          video_owner_channel_title?: string | null;
          view_count?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_daily_rankings: {
        Args: {
          p_playlist_type?: string;
        };
        Returns: {
          video_id: string;
          title: string;
          description: string;
          channel_id: string;
          channel_title: string;
          published_at: string;
          view_count: number;
          like_count: number;
          thumbnail_url: string;
          video_owner_channel_title: string;
          playlist_id: string;
          playlist_type: string;
          video_position: number;
          view_increase: number;
          like_increase: number;
        }[];
      };
      get_weekly_rankings: {
        Args: {
          p_playlist_type?: string;
        };
        Returns: {
          video_id: string;
          title: string;
          description: string;
          channel_id: string;
          channel_title: string;
          published_at: string;
          view_count: number;
          like_count: number;
          thumbnail_url: string;
          video_owner_channel_title: string;
          playlist_id: string;
          playlist_type: string;
          video_position: number;
          weekly_view_increase: number;
          weekly_like_increase: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
